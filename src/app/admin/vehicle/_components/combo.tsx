"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { customerSearchAction } from "@/actions/customer-action";
import { useEffect, useState } from "react";

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

interface PersonSearchProps {
  onSelect?: (person: Person) => void;
}

export function PersonSearch({ onSelect }: PersonSearchProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPeople = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await customerSearchAction(query);
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPeople(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-card border-aim-primary hover:bg-card/5 hover:text-white"
        >
          {value || "Search person..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder="กรอกชื่อลูกค้า..."
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {loading && <CommandEmpty>Loading...</CommandEmpty>}
            {!loading && results.length === 0 && search && (
              <CommandEmpty>No person found.</CommandEmpty>
            )}
            {!loading && results.length > 0 && (
              <CommandGroup>
                {results.map((person) => (
                  <CommandItem
                    key={person.id}
                    value={person.firstName + " " + person.lastName}
                    onSelect={() => {
                      setValue(person.firstName + " " + person.lastName);
                      setOpen(false);
                      setSearch("");
                      onSelect?.(person); // ส่ง person กลับ parent
                    }}
                  >
                    {person.firstName} {person.lastName}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === person.firstName + " " + person.lastName
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// TODO: เช็ค Regex ข้อมูล
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { FormVehicleSchema, FormVehicleValues } from "./schema"
type CustomerFormType = "existed" | "create";

export default function FormVehicle() {
  const [customerType, setCustomerType] = useState<CustomerFormType>("existed")

  const form = useForm<FormVehicleValues>({
    resolver: zodResolver(FormVehicleSchema),
    defaultValues: {
      customerType: "existed",
    },
  })

  const onSubmit = (data: FormVehicleValues) => {
    console.log(data)
  }

  return (
    <div className="gap-y-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card variant="transparentGhost" className="max-w-3xs">
            <CardHeader>
              <CardTitle>
                ลูกค้า
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="customerType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={customerType === "existed" ? "outline" : "default"}
                          onClick={() => {
                            setCustomerType("existed")
                            field.onChange("existed")
                          }}
                          className="flex-1 rounded-4xl"
                        >
                          เก่า
                        </Button>
                        <Button
                          type="button"
                          variant={customerType === "create" ? "outline" : "default"}
                          onClick={() => {
                            setCustomerType("create")
                            field.onChange("create")
                          }}
                          className="flex-1 rounded-4xl"
                        >
                          ใหม่
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card variant="transparentGhost">
            <CardHeader>
              <CardTitle className="text-lg">
                <p className="text-slate-500">ข้อมูลส่วนตัว</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                //     <FormItem>
                //       <FormLabel>ประเภท</FormLabel>
                //       <Select onValueChange={ } defaultValue={ }>
                //         <FormControl>
                //           <SelectTrigger>
                //             <SelectValue placeholder="เลือก" />
                //           </SelectTrigger>
                //         </FormControl>
                //         <SelectContent>
                //           {/* TODO: Changing these */}

                //         </SelectContent>
                //       </Select>
                //       <FormMessage />
                //     </FormItem>
                //   )}
                // />

                    <FormItem>
                      <FormLabel>คำนำหน้า</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือก" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mr">นาย</SelectItem>
                          <SelectItem value="mrs">นาง</SelectItem>
                          <SelectItem value="miss">นางสาว</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เพศ</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือก" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">ชาย</SelectItem>
                          <SelectItem value="female">หญิง</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อ</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกชื่อ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>นามสกุล</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกนามสกุล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลขบัตรประชาชน/เลขประจำตัวสมาชิก</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกเลขบัตร" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เบอร์โทร</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกเบอร์โทร" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="transparentGhost">
            <CardHeader>
              <CardTitle className="text-lg">
                <p className="text-slate-500">ที่อยู่</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="houseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลขที่บ้าน</FormLabel>
                      <FormControl>
                        <Input placeholder="เลขที่" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="village"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>หมู่</FormLabel>
                      <FormControl>
                        <Input placeholder="หมู่" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="building"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>หมู่บ้าน/อาคาร</FormLabel>
                      <FormControl>
                        <Input placeholder="หมู่บ้าน/อาคาร" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="soi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ซอย</FormLabel>
                      <FormControl>
                        <Input placeholder="ซอย" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="road"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ถนน</FormLabel>
                      <FormControl>
                        <Input placeholder="ถนน" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รหัสไปรษณีย์</FormLabel>
                      <FormControl>
                        <Input placeholder="รหัสไปรษณีย์" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="subDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ตำบล</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือก" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="subdistrict1">ตำบล 1</SelectItem>
                          <SelectItem value="subdistrict2">ตำบล 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อำเภอ</FormLabel>
                      <FormControl>
                        <Input placeholder="อำเภอ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>จังหวัด</FormLabel>
                      <FormControl>
                        <Input placeholder="จังหวัด" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              บันทึกข้อมูล
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

import TableCustomer from "./_components/table-customer";

export default function CustomerPage() {
  return (
    <main>
      <div className=" shadow-md bg-aim-navbar-top w-full p-5">
        <div>
          <h1 className="font-extrabold bg-gradient-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">ประวัติการบันทึกข้อมูลลูกค้า</h1>
        </div>
        
        <div className="gap-8">
            <TableCustomer />
        </div>
      </div>
    </main>
  );
}

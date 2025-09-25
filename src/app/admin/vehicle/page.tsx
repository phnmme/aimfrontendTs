import FormVehicle from "./_components/form-vehicle";

export default function VehiclePage() {
  return (
    <main>
      <div className=" shadow-md bg-aim-navbar-top w-full p-5">
        <div>
          <h1 className="font-extrabold bg-gradient-to-r from-[#c2e0f9] to-[#2e77b3] bg-clip-text text-transparent">บันทึกข้อมูลต่ออายุ พรบ. ลูกค้า</h1>
        </div>
        
        <div className="gap-8">
          <FormVehicle />
        </div>
      </div>
    </main>
  );
}

const Help = () => {
    return (
        <div className=" h-full flex justify-center items-center">
            <div className="w-1/2 flex flex-col ">
                <h1 className="text-3xl font-bold mb-4">ศูนย์ช่วยเหลือ</h1>
                <p className="mb-6">
                    ยินดีต้อนรับสู่หน้าความช่วยเหลือของเรา! ที่นี่คุณจะพบคำถามที่พบบ่อยและวิธีแก้ปัญหาพื้นฐาน
                    รวมถึงรายละเอียดการติดต่อสอบถามเพิ่มเติมหากคุณต้องการความช่วยเหลือจากทีมงานของเรา
                </p>

                <h2 className="text-2xl font-semibold mb-3">คำถามที่พบบ่อย (FAQ)</h2>
                <ul className="list-disc pl-5 mb-6">
                    <li>
                        <strong>ฉันจะเริ่มใช้งานแอปพลิเคชันนี้ได้อย่างไร?</strong>
                        <p className="ml-4">
                            เริ่มต้นด้วยการสมัครสมาชิกหรือเข้าสู่ระบบ จากนั้นคุณสามารถเข้าถึงฟีเจอร์ต่าง ๆ
                            ได้ตามที่แอปพลิเคชันจัดเตรียมไว้
                        </p>
                    </li>
                    <li>
                        <strong>ถ้าฉันประสบปัญหาในการติดต่อกับเซิร์ฟเวอร์ ควรทำอย่างไร?</strong>
                        <p className="ml-4">
                            กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ หากปัญหายังคงอยู่
                            ลองรีเฟรชหน้าเว็บหรือแจ้งปัญหาให้เราทราบ
                        </p>
                    </li>
                    <li>
                        <strong>ฉันจะเปลี่ยนภาษาในการใช้งานได้อย่างไร?</strong>
                        <p className="ml-4">
                            คุณสามารถเปลี่ยนภาษาจากเมนูตั้งค่าที่มุมบนขวาของหน้าแอปพลิเคชัน
                        </p>
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mb-3">คู่มือการใช้งาน</h2>
                <p className="mb-6">
                    หากคุณต้องการข้อมูลเชิงลึกเกี่ยวกับการใช้งานแอปพลิเคชันของเรา
                    คุณสามารถอ่านคู่มือการใช้งานที่เราได้จัดทำขึ้นอย่างละเอียด
                </p>
                <p className="mb-6">
                    <a
                        href="/guide"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        อ่านคู่มือการใช้งาน
                    </a>
                </p>

                <h2 className="text-2xl font-semibold mb-3">ติดต่อเรา</h2>
                <p className="mb-1">หากคุณมีคำถามเพิ่มเติมหรือประสบปัญหาใด ๆ กรุณาติดต่อเรา:</p>
                <ul className="list-disc pl-5">
                    <li>
                        <strong>อีเมล:</strong> <a href="mailto:support@example.com"
                                                   className="text-blue-600 underline">support@example.com</a>
                    </li>
                    <li>
                        <strong>โทรศัพท์:</strong> 012-345-6789
                    </li>
                    <li>
                        <strong>ที่อยู่:</strong> 123 ซอยถี่ๆ, ขอนแก่น, ประเทศไทย
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default Help;

import React, { useEffect, useState } from "react";

export default function ProductionForm() {
  const [apartments, setApartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [classifications, setClassifications] = useState([]);

  const [form, setForm] = useState({
    requestDate: "",
    inspector: "",
    apartment: "",
    unitCode: "",
    position: "",
    category: "",
    classification: "",
    content: "",
    causeResult: "",
    handlingSuggestion: "",
    notes: "",
    progress: "not_processed",
    updatedBy: "",
    updateDate: "",
  });

  const people = [
    { id: "p1", name: "Người A" },
    { id: "p2", name: "Người B" },
    { id: "p3", name: "Người C" },
  ];

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const [aRes, pRes, cRes, clRes] = await Promise.all([
          fetch("/api/apartments"),
          fetch("/api/positions"),
          fetch("/api/categories"),
          fetch("/api/classifications"),
        ]);

        const aJson = aRes.ok ? await aRes.json() : [{ id: "A1", name: "A-101" }];
        const pJson = pRes.ok ? await pRes.json() : [{ id: "pos1", name: "Cầu thang" }];
        const cJson = cRes.ok ? await cRes.json() : [{ id: "cat1", name: "Điện" }];
        const clJson = clRes.ok ? await clRes.json() : [{ id: "cl1", name: "Cấp 1" }];

        setApartments(aJson);
        setPositions(pJson);
        setCategories(cJson);
        setClassifications(clJson);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLists();
  }, []);

  const handleFormChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const saveForm = () => {
    console.log("Save form: ", form);
    alert("Giả lập lưu form");
  };

  const exportForm = () => {
    const blob = new Blob([JSON.stringify(form, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto border rounded shadow-sm bg-white">
        <div className="flex gap-4 p-4">
          {/* Left: Input form */}
          <div className="w-1/3 border p-4 rounded">
            <h3 className="font-semibold mb-3">I - Form nhập thông tin</h3>

            {/* Top part: 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">Ngày nhập yêu cầu</label>
                <input type="date" className="mt-1 mb-2 w-full border rounded p-2" value={form.requestDate} onChange={e => handleFormChange("requestDate", e.target.value)} />

                <label className="block text-sm">Chung cư</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={form.apartment} onChange={e => handleFormChange("apartment", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  <option value="EGV">EGV</option>
                  <option value="LVD">LVD</option>
                </select>

                <label className="block text-sm">Mã căn hộ</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={form.unitCode} onChange={e => handleFormChange("unitCode", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {apartments.map(a => (
                    <option key={a.id} value={a.name || a.id}>{a.name || a.id}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm">Người kiểm tra</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={form.inspector} onChange={e => handleFormChange("inspector", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {people.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>

                <label className="block text-sm">Vị trí</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={form.position} onChange={e => handleFormChange("position", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {positions.map(p => <option key={p.id} value={p.name || p.id}>{p.name || p.id}</option>)}
                </select>

                <label className="block text-sm">Hạng mục</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={form.category} onChange={e => handleFormChange("category", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {categories.map(c => <option key={c.id} value={c.name || c.id}>{c.name || c.id}</option>)}
                </select>

                <label className="block text-sm">Phân loại</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={form.classification} onChange={e => handleFormChange("classification", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {classifications.map(c => <option key={c.id} value={c.name || c.id}>{c.name || c.id}</option>)}
                </select>
              </div>
            </div>

            {/* Bottom part */}
            <label className="block text-sm mt-3">Nội dung</label>
            <textarea className="mt-1 mb-2 w-full h-20 border rounded p-2" value={form.content} onChange={e => handleFormChange("content", e.target.value)} />

            <label className="block text-sm">Nguyên nhân / Kết quả</label>
            <textarea className="mt-1 mb-2 w-full h-16 border rounded p-2" value={form.causeResult} onChange={e => handleFormChange("causeResult", e.target.value)} />

            <label className="block text-sm">Xử lý / Đề xuất</label>
            <textarea className="mt-1 mb-2 w-full h-16 border rounded p-2" value={form.handlingSuggestion} onChange={e => handleFormChange("handlingSuggestion", e.target.value)} />

            <label className="block text-sm">Ghi chú</label>
            <textarea className="mt-1 mb-2 w-full h-12 border rounded p-2" value={form.notes} onChange={e => handleFormChange("notes", e.target.value)} />

            {/* Tiến độ + cập nhật */}
            <div className="grid grid-cols-3 gap-2 mt-2 items-center">
              <div>
                <span className="block text-sm mb-1">Tiến độ</span>
                <div className="flex flex-col gap-1">
                  <label><input type="radio" name="progress" checked={form.progress === "not_processed"} onChange={() => handleFormChange("progress", "not_processed")} /> Chưa xử lý</label>
                  <label><input type="radio" name="progress" checked={form.progress === "in_progress"} onChange={() => handleFormChange("progress", "in_progress")} /> Đang xử lý</label>
                  <label><input type="radio" name="progress" checked={form.progress === "processed"} onChange={() => handleFormChange("progress", "processed")} /> Đã xử lý</label>
                  <label><input type="radio" name="progress" checked={form.progress === "completed"} onChange={() => handleFormChange("progress", "completed")} /> Hoàn thành</label>
                </div>
              </div>

              <div>
                <label className="block text-sm">Cập nhật bởi</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={form.updatedBy} onChange={e => handleFormChange("updatedBy", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {people.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm">Ngày cập nhật</label>
                <input type="date" className="mt-1 mb-2 w-full border rounded p-2" value={form.updateDate} onChange={e => handleFormChange("updateDate", e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button onClick={saveForm} className="px-3 py-2 bg-blue-600 text-white rounded">Lưu</button>
              <button onClick={() => setForm({
                requestDate: "",
                inspector: "",
                apartment: "",
                unitCode: "",
                position: "",
                category: "",
                classification: "",
                content: "",
                causeResult: "",
                handlingSuggestion: "",
                notes: "",
                progress: "not_processed",
                updatedBy: "",
                updateDate: "",
              })} className="px-3 py-2 border rounded">Làm mới</button>
              <button onClick={exportForm} className="px-3 py-2 bg-purple-600 text-white rounded">Xuất</button>
            </div>
          </div>

          {/* Right panel giữ nguyên */}
          <div className="flex-1 border p-4 rounded flex flex-col">
            <h3 className="font-semibold mb-3">II - Tìm kiếm</h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm">Ngày yêu cầu (Từ)</label>
                <input type="date" className="mt-1 mb-2 w-full border rounded p-2" value={search.requestFrom} onChange={e => handleSearchChange("requestFrom", e.target.value)} />
                <label className="block text-sm">Ngày hoàn thành (Từ)</label>
                <input type="date" className="mt-1 mb-2 w-full border rounded p-2" value={search.completeFrom} onChange={e => handleSearchChange("completeFrom", e.target.value)} />
                <label className="block text-sm">Mã căn hộ</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={search.unitCode} onChange={e => handleSearchChange("unitCode", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {apartments.map(a => <option key={a.id} value={a.name || a.id}>{a.name || a.id}</option>)}
                </select>
                <label className="block text-sm">Vị trí</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={search.position} onChange={e => handleSearchChange("position", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {positions.map(p => <option key={p.id} value={p.name || p.id}>{p.name || p.id}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm">Ngày yêu cầu (Đến)</label>
                <input type="date" className="mt-1 mb-2 w-full border rounded p-2" value={search.requestTo} onChange={e => handleSearchChange("requestTo", e.target.value)} />
                <label className="block text-sm">Ngày hoàn thành (Đến)</label>
                <input type="date" className="mt-1 mb-2 w-full border rounded p-2" value={search.completeTo} onChange={e => handleSearchChange("completeTo", e.target.value)} />
                <label className="block text-sm">Chung cư</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={search.apartment} onChange={e => handleSearchChange("apartment", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  <option value="EGV">EGV</option>
                  <option value="LVD">LVD</option>
                </select>
                <label className="block text-sm">Hạng mục</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={search.category} onChange={e => handleSearchChange("category", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {categories.map(c => <option key={c.id} value={c.name || c.id}>{c.name || c.id}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm">Tìm theo nội dung</label>
                <input type="text" className="mt-1 mb-2 w-full border rounded p-2" value={search.content} onChange={e => handleSearchChange("content", e.target.value)} />
                <label className="block text-sm">Phân loại</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={search.classification} onChange={e => handleSearchChange("classification", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {classifications.map(c => <option key={c.id} value={c.name || c.id}>{c.name || c.id}</option>)}
                </select>
                <label className="block text-sm">Người kiểm tra</label>
                <select className="mt-1 mb-2 w-full border rounded p-2" value={search.inspector} onChange={e => handleSearchChange("inspector", e.target.value)}>
                  <option value="">-- Chọn --</option>
                  {people.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>

                <div className="mt-2">
                  <span className="block text-sm mb-1">Tiến độ</span>
                  <div className="flex flex-col gap-1">
                    <label className="inline-flex items-center"><input type="checkbox" checked={search.progress.not_processed} onChange={() => handleSearchProgressCheckbox("not_processed")} /> <span className="ml-2">Chưa xử lý</span></label>
                    <label className="inline-flex items-center"><input type="checkbox" checked={search.progress.in_progress} onChange={() => handleSearchProgressCheckbox("in_progress")} /> <span className="ml-2">Đang xử lý</span></label>
                    <label className="inline-flex items-center"><input type="checkbox" checked={search.progress.processed} onChange={() => handleSearchProgressCheckbox("processed")} /> <span className="ml-2">Đã xử lý</span></label>
                    <label className="inline-flex items-center"><input type="checkbox" checked={search.progress.completed} onChange={() => handleSearchProgressCheckbox("completed")} /> <span className="ml-2">Hoàn thành</span></label>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button onClick={submitSearch} className="px-3 py-2 bg-green-600 text-white rounded">Tìm kiếm</button>
              <button onClick={resetSearch} className="px-3 py-2 border rounded">Xóa tìm kiếm</button>
            </div>

            {/* Results list area */}
            <div className="mt-4 flex-1 overflow-auto border rounded p-2">
              <h4 className="mb-2 font-medium">Kết quả</h4>

              {loadingSearch ? <div>Đang tải kết quả...</div> : (
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2 px-2">Ngày</th>
                      <th className="py-2 px-2">Người kiểm tra</th>
                      <th className="py-2 px-2">Chung cư</th>
                      <th className="py-2 px-2">Mã căn hộ</th>
                      <th className="py-2 px-2">Vị trí</th>
                      <th className="py-2 px-2">Hạng mục</th>
                      <th className="py-2 px-2">Nội dung</th>
                      <th className="py-2 px-2">Tiến độ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length === 0 ? (
                      <tr><td colSpan={8} className="p-4 text-center">Chưa có dữ liệu</td></tr>
                    ) : results.map(r => (
                      <tr key={r.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2">{r.requestDate}</td>
                        <td className="py-2 px-2">{r.inspector}</td>
                        <td className="py-2 px-2">{r.apartment}</td>
                        <td className="py-2 px-2">{r.unitCode}</td>
                        <td className="py-2 px-2">{r.position}</td>
                        <td className="py-2 px-2">{r.category}</td>
                        <td className="py-2 px-2">{r.content}</td>
                        <td className="py-2 px-2">{r.progress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

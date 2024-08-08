import { useState } from "react";

export const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [size, setSize] = useState("");

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
      setQrData("");
      setSize("");
    } catch (error) {
      console.log("Unable to scan the QR Code" + error);
    } finally {
      setLoading(false);
    }
  };
  const downloadQRCode = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QRCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  const handleDataInput = (e) => {
    setQrData(e.target.value);
  };

  const handleSizeInput = (e) => {
    setSize(e.target.value);
  };
  return (
    <>
      <div className="app-container flex w-full h-screen flex-col justify-center items-center bg-slate-300">
        <h1 className="font-bold text-blue-700 my-3">QR Code Generator</h1>
        {loading && <p className="mb-2"> Loading Please Wait...</p>}
        {img && (
          <img
            src={img}
            alt="QR Code"
            width={200}
            className="p-2 shadow-lg my-2"
          />
        )}

        <div>
          <label
            htmlFor="dataInput"
            className="block mb-2 text-blue-400 font-bold"
          >
            Data for QR Code:
          </label>
          <input
            type="text"
            id="dataInput"
            placeholder="Enter Data for QR Code"
            value={qrData}
            className="border-2 block mb-2 w-full p-2 border-blue-400 rounded-lg"
            onChange={(e) => handleDataInput(e)}
          />
          <label
            htmlFor="sizeInput"
            className="block mb-2 text-blue-400 font-bold"
          >
            Images Size (e.g., 150):
          </label>
          <input
            type="text"
            className="border-2 block mb-2 w-full p-2 border-blue-400 rounded-lg"
            id="sizeInput"
            placeholder="Enter Image Size"
            value={size}
            onChange={(e) => handleSizeInput(e)}
          />

          <button
            onClick={() => generateQRCode()}
            className="bg-blue-600 mx-2  p-2 rounded-lg my-2 w-40 cursor-pointer text-white transition ease-in-out delay-150 hover:bg-blue-900 "
            disabled={loading}
          >
            Generate QR Code
          </button>

          <button
            onClick={() => downloadQRCode()}
            className="bg-green-600 mx-2 p-2 rounded-lg my-2 w-40 cursor-pointer text-white transition ease-in-out delay-150 hover:bg-green-900"
          >
            Download QR Code
          </button>
        </div>
        <footer>
          <p className="my-2">
            Designed By{" "}
            <span className="text-blue-600 cursor-pointer">Ashvin Vinith</span>
          </p>
        </footer>
      </div>
    </>
  );
};

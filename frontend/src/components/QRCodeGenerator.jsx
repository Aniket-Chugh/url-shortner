import { useState } from 'react'
import { QrCode, Download } from 'lucide-react'

const QRCodeGenerator = ({ url }) => {
  const [showQR, setShowQR] = useState(false)

  const generateQRCode = () => {
    // Using QR Server API for QR code generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
  }

  const downloadQR = () => {
    const qrUrl = generateQRCode()
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = `qr-code-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowQR(!showQR)}
        className="px-6 py-2 bg-accent-100 hover:bg-accent-200 text-accent-700 rounded-lg transition-colors flex items-center space-x-2"
      >
        <QrCode size={16} />
        <span>QR Code</span>
      </button>

      {showQR && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-slide-up">
          <div className="text-center">
            <img 
              src={generateQRCode()} 
              alt="QR Code" 
              className="w-48 h-48 mx-auto border border-gray-200 rounded-lg"
            />
            <button
              onClick={downloadQR}
              className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QRCodeGenerator
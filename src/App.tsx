import { useState } from "react"
import { Header } from "./components/header"
import { UploadDropArea } from "./components/upload-drop-area"
import { UploadTable } from "./components/upload-table"
import axios from "axios"

export function App() {
  const [image, setImage] = useState<File | null>()
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [processedImage, setProcessedImage] = useState<string | null>(null)

  async function handleUpload(file: File) {
    setImage(file)
    const bgRemoved = await removeBackground(file)
    setProcessedImage(bgRemoved ?? null)
  }

  async function removeBackground(file: File) {
    const formData = new FormData()
    formData.append('image_file', file)
    formData.append('size', 'auto')

    try {
      const response = await axios.post('https://sdk.photoroom.com/v1/segment', formData, {
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_KEY,
        },
        responseType: 'blob',
        onUploadProgress: (ProgressEvent: any) => {
          if(ProgressEvent.total) {
            const progress = (ProgressEvent.loaded / ProgressEvent.total) * 100
            setUploadProgress(progress)
          }
        }
      })

      return URL.createObjectURL(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  function handleRemoveImageFromTable() {
    setImage(null)
    setProcessedImage(null)
    setUploadProgress(0)
  }

  return (
    <div className="antialiased">
      <Header />
      
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight">Upload</h2>
        <UploadDropArea onUpload={handleUpload} />
        
        {image && (
          <UploadTable 
            file={image}
            progress={uploadProgress}
            onRemove={handleRemoveImageFromTable} 
          />
        )}
      </div>

      {processedImage && (
        <div className="flex flex-col items-center gap-8">
          <h1>Click on the image below to download</h1>
          <a 
            href={processedImage}
            download="image_without_background"
          >
            <img 
              src={processedImage} 
              alt="image_without_background" 
            />
          </a>
        </div>
      )}
    </div>
  )
}
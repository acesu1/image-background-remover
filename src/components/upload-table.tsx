import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ImageUploadProgress } from "./image-upload-progress.tsx"


export function UploadTable({ file, onRemove, progress }: { file: File, onRemove: () => void, progress: number }) {
  const imageUrl = URL.createObjectURL(file)
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">File</TableHead>
            <TableHead>File name</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <img src={imageUrl} alt={imageUrl} />
            </TableCell>
            <TableCell>{file.name}</TableCell>
            <TableCell>
              <ImageUploadProgress progress={progress} />
            </TableCell>
            <TableCell className="text-right">
              <Button
                onClick={onRemove}
                variant="destructive"
                size="sm"
              >
                <Trash />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
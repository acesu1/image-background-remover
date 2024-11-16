import { Progress } from '@/components/ui/progress'
import { CircleCheck } from 'lucide-react'

export function ImageUploadProgress({ progress }: { progress: number }) {

  return (
    <div className="flex items-center font-medium">
      {progress !== 100 ? (
        <Progress value={progress} className="w-[60%] transition-all" />
      ): (
        <>
          <CircleCheck className="mr-2 h-4 w-4 text-emerald-500" />
          <span className="text-emerald-500">Complete</span>
        </>
      )}
    </div>
  )
}


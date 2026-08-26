import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const SubmitButton = ({isLoading}: any) => {
  return (
    <div className='flex justify-end mt-6'>
        <Button 
            type='submit'
            size="lg"
            disabled={isLoading}
            className="gap-2"
        >
            {isLoading ? (
                <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-xl animate-spin'>
                        Creating...
                    </div>
                </>
            ) : (
                <>
                    <Plus className='w-5 h-5' />
                    create Problem
                </> 
            )}
        </Button>
    </div>
  )
}

export default SubmitButton
'use client'

import { Button } from '@repo/ui/button'

type ConfirmationDialogProps = {
  onConfirm: (...props: unknown[]) => void
  onCancel: (...props: unknown[]) => void
}

export function ConfirmationDialog({
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <>
      Confirmation Dialog
      <Button onClick={onConfirm}>Confirm</Button>
      <Button onClick={onCancel} variant='secondary'>
        Cancel
      </Button>
    </>
  )
}

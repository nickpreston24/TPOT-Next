import { ReactNode } from 'react'
import { toast } from 'react-toastify'

const Message: ReactNode = () => {
  return ({ closeToast, message = '...' }: { closeToast: any; message: string }) => (
    <div>
      message ?? Lorem ipsum dolor
      <button>Retry</button>
      <button onClick={closeToast}>Close</button>
    </div>
  )
}

export const displayMessage = () => toast(Message)

export const notify = (message: string = '...', mode = '') => {
  let toaster = !!mode ? toast[mode] : toast
  toaster(message, {
    position: 'bottom-left',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

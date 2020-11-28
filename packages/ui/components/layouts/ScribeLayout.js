import { layout as dashboardLayout } from '@layouts/DashboardLayout'

const ScribeLayout = ({ children }) => <>{children}</>

export const layout = page =>
  dashboardLayout(<ScribeLayout>{page}</ScribeLayout>)

export default ScribeLayout

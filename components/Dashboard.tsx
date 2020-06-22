import { FC, Component, ReactNode, ElementType } from 'react'
import { Header } from './header'
import Box from '@material-ui/core/Box'
import Page from './Page'

// class Dashboard extends Component {

//   render() {
//     const { children, title, details } = this.props
//     return (
//       <Page title={title}>
//         <Box height="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch">
//           <Header />
//           <Box flexGrow={1} bgcolor="#f8f9fa" display="flex" overflow="hidden">
//             <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1} fontSize={24} style={{ overflowY: 'hidden', overflowX: 'hidden' }}>
//               {children}
//             </Box>
//             {details && <Box bgcolor="white" boxShadow={3} p={2} style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
//               {details}
//             </Box>}
//           </Box>
//         </Box>
//       </Page>
//     )
//   }
// }

type DashboardProps = {
  title: string,
  children: ElementType | ReactNode,
  details?: string | Function
}

const Dashboard: FC<DashboardProps> = (props: DashboardProps) => {

  const { children, title, details } = props

  return (
    <Page title={title}>
      <Box height="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch">
        <Header />
        <Box flexGrow={1} bgcolor="#f8f9fa" display="flex" overflow="hidden">
          <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1} fontSize={24} style={{ overflowY: 'hidden', overflowX: 'hidden' }}>
            {children}
          </Box>
          {details
            && <Box
              bgcolor="white" boxShadow={3} p={2}
              style={{ overflowY: 'scroll', overflowX: 'hidden' }}
            >
              {details}
            </Box>}
        </Box>
      </Box>
    </Page>
  )
}


export default Dashboard
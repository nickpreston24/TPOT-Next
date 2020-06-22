import { withStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';

// An alternate Paper component to fix overflow clipping in the X direction on rows that have no data
const StyledTableBody = withStyles({
    root: {
        '& div > div > table': {
            overflow: 'hidden'
        }
    },
})(Paper);

export default StyledTableBody;
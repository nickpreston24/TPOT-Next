import StatusChip from '../StatusChip'
import DocxIcon from './DocxIcon';

const columns =
    [
        {
            field: 'Icon', searchable: false, export: false,
            render: () => <DocxIcon />
        },
        { title: 'Document', field: 'title', type: 'string', searchable: true },
        {
            title: 'Status', field: 'status', type: 'string', searchable: false,
            render: paper => {
                const status = paper.status
                // console.log('status (checkout) :>> ', status)
                return <StatusChip status={status} />
            }
        },
        { title: 'Last Edited', field: 'date_modified', type: 'string', searchable: false },
        { title: 'Author', field: 'author', type: 'string', searchable: false },
        { title: 'Uploaded', field: 'date_uploaded', type: 'string', searchable: false, hidden: true },
        { title: 'Cloud Location', field: 'docx', type: 'string', searchable: false, hidden: true },
        { title: 'Slug', field: 'slug', searchable: false, hidden: true },
        { title: 'Excerpt', field: 'excerpt', searchable: false, hidden: true },
        { title: 'ID', field: 'id', searchable: false, hidden: true },
    ]

export default columns;
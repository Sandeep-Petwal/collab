import { Plus, MoreVertical, Grid, List, SortAsc, Folder, File } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'




import axiosInstance from '@/api/axios';
import { data, useNavigate } from 'react-router-dom';
const VITE_API_URL = import.meta.env.VITE_API_URL;



function Home() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.doc.user)

    // list view or grid view
    const [view, setView] = useState('list');
    const templates = [
        { id: 1, title: 'Blank document', icon: '➕', type: 'blank' },
        // { id: 2, title: 'Brochure', subtitle: 'Geometric', thumbnail: '/brochure.png' },
        // { id: 3, title: 'Resume', subtitle: 'Serif', thumbnail: '/resume.png' },
        // { id: 4, title: 'Letter', subtitle: 'Spearmint', thumbnail: '/letter.png' },
        // { id: 5, title: 'Project proposal', subtitle: 'Tropic', thumbnail: '/proposal.png' },
    ]
    const temDocs = [
        { id: 1, title: 'Project Plan', lastEdited: '3:56 PM', thumbnail: '/thumbnail.png' },
        { id: 2, title: 'Meeting Notes', lastEdited: '10:17 AM', thumbnail: '/thumbnail.png' },
        { id: 3, title: 'Budget Report', lastEdited: '10:17 AM', thumbnail: '/thumbnail.png' },
    ]



    // function to create new document and navigate to document page
    const createNewDocument = async () => {
        setLoading(true);
        const response = await axiosInstance.post(`${VITE_API_URL}/docs/create`);
        console.table(response?.data);

        setLoading(false);
        navigate(`/document/${response?.data?.data?.id}`);
    }



    const [docs, setDocs] = useState(temDocs);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    const loadAllDocuments = async () => {
        const response = await axiosInstance.get(`${VITE_API_URL}/docs/documents/all?userId=${user.id}&page=${page}&limit=${limit}`);
        console.table(response?.data?.data?.rows);
        setDocs(response?.data?.data?.rows);
    }

    useEffect(() => {
        loadAllDocuments();
    }, [page, limit]);

    return (
        <div className="min-h-screen w-full bg-background p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-foreground">Start a new document</h1>
                {/* <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Grid className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div> */}
            </div>

            {/* Templates Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                {templates.map((template) => (
                    <Card key={template.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="aspect-[8.5/11] relative overflow-hidden rounded-t-lg">
                            {template.type === 'blank' ? (
                                <div
                                    onClick={createNewDocument}
                                    className="w-full h-full flex items-center justify-center bg-secondary">
                                    {
                                        loading ? (
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black">

                                            </div>
                                        ) : (
                                            <Plus className="h-8 w-8" />
                                        )
                                    }
                                </div>
                            ) : (
                                <img
                                    src={template.thumbnail}
                                    alt={template.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                            )}
                        </div>
                        <div className="p-3 rounded-b-lg bg-gray-200">
                            <h3 className="text-sm font-medium text-foreground">{template.title}</h3>
                            {template.subtitle && (
                                <p className="text-xs text-muted-foreground">{template.subtitle}</p>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Documents Section */}
            <div className="mb-6">
                <div className="flex  flex-wrap justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Your documents</h2>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setView(view === 'list' ? 'grid' : 'list')}
                        >
                            {view === 'grid' ? <List className="h-4 w-4 mr-2" /> : <Grid className="h-4 w-4 mr-2" />}
                            {view === 'grid' ? 'List view' : 'Grid view'}
                        </Button>
                        <Button variant="ghost" size="sm">
                            <SortAsc className="h-4 w-4 mr-2" />
                            Last opened by me
                        </Button>
                        {/* <Button variant="ghost" size="icon">    
                            <Folder className="h-5 w-5" />
                        </Button> */}
                    </div>
                </div>

                {/* if document length is zero  */}
                {docs.length === 0 && <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Folder className="h-24 w-24 text-foreground" />
                    <p className="text-2xl font-semibold text-foreground">No documents found</p>
                    <p className="text-sm text-muted-foreground">You haven't created any documents yet.</p>
                </div>}




                {
                    view === 'grid' ? <div className="flex flex-wrap gap-4">
                        {docs.map((doc) => (
                            <div key={doc.id} className="flex-none w-full md:w-1/2 lg:w-1/4">
                                <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                                    <div className="aspect-[8.5/11] relative overflow-hidden rounded-lg">
                                        <img
                                            src={doc.thumbnail}
                                            alt={doc.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div className="p-3  rounded-b-lg bg-gray-200">
                                        <h3 className="text-sm font-medium text-foreground">{doc.title}</h3>
                                        <p className="text-xs text-muted-foreground">Last edited {doc.lastEdited}</p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                        :
                        <ul className="space-y-2 w-full  transition-colors   dark:border-gray-700">
                            {docs.map((doc) => (
                                <li key={doc.id} className="flex items-center gap-2 w-full px-3 py-2 border-b border-gray-300 hover:bg-gray-500 cursor-pointer transition-colors">
                                    <File className="h-5 w-5 mr-2" />
                                    <h3 className="text-sm font-medium text-foreground">{doc.title}</h3>
                                    <p className="text-xs text-muted-foreground">Last edited {doc.lastEdited}</p>
                                </li>
                            ))}
                        </ul>

                }




            </div>
        </div>
    )
}

export default Home

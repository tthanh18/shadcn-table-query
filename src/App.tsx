import { ThemeProvider } from '@/components/theme-provider'
import { ListUser } from '@/custom/list-user'
import { Toaster } from 'react-hot-toast'
import './styles/styles.css'

const App = () => {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
            <main className='h-screen flex justify-center pt-10'>
                <ListUser />
            </main>
            <Toaster
                position='top-right'
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
        </ThemeProvider>
    )
}

export default App

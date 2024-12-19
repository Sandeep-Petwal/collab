import { useState } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDispatch } from 'react-redux'
import { login } from '@/state/docSlice'
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  // navigate to home if token available
  if (localStorage.getItem('token')) {
    window.location.href = '/';
  }

  const { toast } = useToast()
  document.title = 'Sign up'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch();




  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        password,
      })

      setEmailSent(true);



    } catch (error) {
      setError(error.response.data.message);
      toast({
        title: 'Error',
        description: error.response.data.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }



  if (emailSent) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-950  z-50">
        <div className=" w-96 bg-gray-900 p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-zinc-100">Email Verification</h2>
          <p className="mb-4 text-zinc-400">
            A verification email has been sent to your email address. Please click the link in the email to verify your account.
          </p>
          <button
            className="bg-zinc-700 text-zinc-100 rounded-md px-4 py-2 focus:ring-2 focus:ring-zinc-300 focus:border-transparent hover:bg-zinc-600 transition-colors duration-150"
            onClick={() => {
              navigate('/login');
              setEmailSent(false);
            }}
          >
            OK
          </button>
          <button
            className="bg-zinc-700 ml-9 text-zinc-100 rounded-md px-4 py-2 focus:ring-2 focus:ring-zinc-300 focus:border-transparent hover:bg-zinc-600 transition-colors duration-150"
            onClick={() => {
              navigate('/login');
              setEmailSent(false);
            }}
          >
            Login
          </button>
        </div>
      </div>

    )
  }


  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-zinc-900">


      {/* logo and name  */}
      <div className="text-center flex justify-center items-center gap-2 mb-8">
        <img src="/docs.png" alt="logo" className="w-16 h-16 mx-auto" />
        <h1 className="text-4xl font-bold text-zinc-100">Docs</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800 p-6 rounded-md shadow-md md:w-96 mx-auto">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-zinc-100">
            Name
          </label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full bg-zinc-700 text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-300 focus:border-transparent"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-zinc-100">
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full bg-zinc-700 text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-300 focus:border-transparent"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-zinc-100">
            Password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full bg-zinc-700 text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-300 focus:border-transparent"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-zinc-600 text-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-300 focus:border-transparent">
          Sign up
        </Button>
      </form>
      {error && (
        <div className="mt-4 text-center text-sm text-red-600">
          <X className="inline-block w-4 h-4 mr-2" />
          {error}
        </div>
      )}
    </div>
  )
}

export default Signup


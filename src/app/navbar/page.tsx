import Image from "next/image";
import cclogo from '/images/cclogo.png';   // Light mode logo

const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 py-16 bg-background dark:bg-navBG text-foreground dark:text-foreground">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-h2Color">Welcome back</h1>
          <h2 className="text-xl font-semibold mb-6 text-h2Color">Login to your account</h2>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-1 text-h2Color">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full px-4 py-2 bg-asideBG dark:bg-navBG text-foreground rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1 text-h2Color">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              className="w-full px-4 py-2 bg-asideBG dark:bg-navBG text-foreground rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-aTextColor text-sm">Remember Me</label>
            </div>
            <a href="#" className="text-sm text-aHoverTextColor hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300 mb-4">
            Login now
          </button>

          {/* Google Sign-in Button */}
          <button className="w-full py-3 bg-gray-700 dark:bg-gray-600 hover:bg-gray-800 text-white font-semibold rounded-lg flex items-center justify-center transition duration-300">
            <img src="/path/to/google-icon.svg" alt="Google Icon" className="h-6 w-6 mr-2" />
            Or sign-in with Google
          </button>

          <p className="text-sm font-light mt-4">
            Don’t have an account?{' '}
            <a href="#" className="font-medium text-green-600 hover:underline">
              Join free today
            </a>
          </p>
        </div>
      </div>
            {/* Left Side: Image */}
            <div className="hidden lg:flex w-1/2">
        <Image
          src={cclogo}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;

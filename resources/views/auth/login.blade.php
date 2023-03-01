<!doctype html>
<html class="h-full bg-gray-50">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="h-full">
<div class="min-h-full md:flex bg-white">
    <div class="md:flex-none md:w-full min-h-screen flex items-center justify-center p-6 md:p-0">

        <div class="lg:w-2/3 xl:w-1/2">

            <div>
                <h2 class="text-2xl lg:text-4xl text-gray-900 font-bold mb-3">{{ __('Welcome back ') }}</h2>
                <h4 class="text-gray-600">
                    @if(Route::is('register') )
                        {{ __('Register for an account') }}
                    @else
                        {{ __(' Sign in to your account') }}
                    @endif
                </h4>
            </div>
            @if($errors->any())
                <ul>
                    @foreach($errors->all() as $error)
                        <li> {{ $error }}</li>
                    @endforeach
                </ul>
            @endif
            <form class="mt-8 space-y-6" action="/login" method="POST">
                @csrf
                {{--        <input type="hidden" name="remember" value="true">--}}
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">{{ __('Email address') }}</label>
                        <input id="email-address"  name="email" type="email" autocomplete="email"
                               required class="appearance-none rounded-none relative block w-full px-3 py-2 border
                       border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                       ßßfocus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="{{ __('Email address') }}">
                    </div>
                    <div>
                        <label for="password" class="sr-only">{{ __('Password') }}</label>
                        <input id="password" name="password"  type="password" autocomplete="current-password"
                               required class="appearance-none rounded-none relative block w-full px-3 py-2 border
                       border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none
                       ßßfocus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="{{ __('Password') }}">
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember" type="checkbox" class="h-4 w-4 text-indigo-600
                ßßfocus:ring-indigo-500 border-gray-300 rounded">
                        <label for="remember" class="ml-2 block text-sm text-gray-900"> {{ __('Remember me') }} </label>
                    </div>

                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> {{ __('Forgot your password?') }}   </a>
                    </div>
                </div>

                <div>
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent
            text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-indigo-500">
      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
        <!-- Heroicon name: solid/lock-closed -->
        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
        </svg>
      </span>
                        {{ __('Sign in') }}
                    </button>

                    <p class="text-center py-4">or</p>

                    <a  href="/register" class="group relative w-full flex justify-center py-2 px-4 border border-transparent
            text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:bg-green-500">
      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
        <!-- Heroicon name: solid/lock-closed -->
        <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
        </svg>
      </span>
                        {{ __('Register') }}
                    </a>

                </div>
            </form>
        </div>
    </div>

</div>
</body>

</html>


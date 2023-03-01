


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
            <form class="mt-8 space-y-6" action="/register" method="POST">
                @csrf
                <input type="hidden" name="remember" value="true">
                <div class="form__login">
                    <div class="mb-3">
                        <label for="name" class="text-gray-700 font-medium block mb-2">{{ __('Name') }}</label>
                        <input id="name" name="name" type="text" autocomplete="name" autofocus
                               class="placeholder:text-gray-500 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:placeholder:text-transparent focus:ring-1 sm:text-sm"
                               placeholder="{{ __('Name') }}" value="{{ old('name') }}">
                    </div>
                    <div class="mb-3">
                        <label for="email-address" class="text-gray-700 font-medium block mb-2">{{ __('Email') }}</label>
                        <input id="email-address" name="email" type="email" autocomplete="email"
                               class="placeholder:text-gray-500 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:placeholder:text-transparent focus:ring-1 sm:text-sm"
                               placeholder="{{ __('Email') }}" value="{{ old('email') }}">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="text-gray-700 font-medium block mb-2">{{ __('Password') }}</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                               class="placeholder:text-gray-500 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:placeholder:text-transparent focus:ring-1 sm:text-sm"
                               placeholder="••••••••••">
                    </div>
                    <div class="mb-4">
                        <label for="password_confirmation" class="text-gray-700 font-medium block mb-2">{{ __('Confirm Password') }}</label>
                        <input id="password_confirmation" name="password_confirmation" type="password"
                               class="placeholder:text-gray-500 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:placeholder:text-transparent focus:ring-1 sm:text-sm"
                               placeholder="••••••••••">
                    </div>
                </div>

                <div>
                    <button type="submit"
                            class="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {{ __('Register') }}
                    </button>

                    <div class="pt-6">
                        <p class="text-sm text-center">
                            <span class="text-gray-600">{{ __('Already have an account?') }}</span>
                            <a href="/login" class="text-gray-900 hover:text-indigo-700 font-bold">{{ __('Login') }}</a>
                        </p>
                    </div>
                </div>
            </form>

        </div>
    </div>

</div>
</body>

</html>



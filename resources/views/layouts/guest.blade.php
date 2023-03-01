<!doctype html>
<html class="h-full bg-gray-50">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="h-full">
<div class="min-h-full md:flex bg-white">
    <div class="md:flex-none md:w-1/2 min-h-screen flex items-center justify-center p-6 md:p-0">

        <div class="lg:w-2/3 xl:w-1/2">
            {!! Form::open([ 'route'=>['local', http_build_query(request()->except(['_token']))] ]) !!}
            <ul class="text-sm mt-4 font-bold flex justify-end">
                <li><button name="language" value="sv" type="submit">Svenska</button> /</li>
                <li class="px-1"><button name="language" value="en" type="submit">English</button> </li>
            </ul>
            {!! Form::close() !!}
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
            {{ $slot }}
        </div>
    </div>
    <div class="hidden md:block md:flex-none md:w-1/2">
        <img class="w-full h-full object-cover"
             src="{{ asset('images/hero-emiweb.jpeg') }}"
             alt="welcome">
    </div>
</div>
</body>

</html>

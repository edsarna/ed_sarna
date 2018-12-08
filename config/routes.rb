Rails.application.routes.draw do
  # STEP 1: A ROUTE triggers a controller action
  # verb "/urls" => "namespace/controllers#action"

  namespace :api do
    get '/posts' => 'posts#index'
    post '/posts' => 'posts#create'
    get '/posts/last' => 'posts#last' # not RESTful
    get '/posts/:id' => 'posts#show'
    patch '/posts/:id' => 'posts#update'
    delete '/posts/:id' => 'posts#destroy'

    get '/images' => 'images#index'
    post '/images' => 'images#create'
    get '/images/recent' => 'images#recent' # not RESTful
    get '/images/:id' => 'images#show'
    patch '/images/:id' => 'images#update'
    delete '/images/:id' => 'images#destroy'

    get '/reviews' => 'reviews#index'
    post '/reviews' => 'reviews#create'
    get '/reviews/:id' => 'reviews#show'
    patch '/reviews/:id' => 'reviews#update'
    delete '/reviews/:id' => 'reviews#destroy'

    get '/readings' => 'readings#index'
    post '/readings' => 'readings#create'
    get '/readings/:id' => 'readings#show'
    patch '/readings/:id' => 'readings#update'
    delete '/readings/:id' => 'readings#destroy'

    get '/publications' => 'publications#index'
    post '/publications' => 'publications#create'
    get '/publications/last' => 'publications#last' # not RESTful
    get '/publications/:id' => 'publications#show'
    patch '/publications/:id' => 'publications#update'
    delete '/publications/:id' => 'publications#destroy'

    get '/awards' => 'awards#index'
    post '/awards' => 'awards#create'
    get '/awards/:id' => 'awards#show'
    patch '/awards/:id' => 'awards#update'
    delete '/awards/:id' => 'awards#destroy'

    post '/users' => 'users#create'
  end
end

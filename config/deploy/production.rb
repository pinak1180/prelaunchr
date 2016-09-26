set :stage, :production
set :branch, :master
set :rails_env, 'production'



server '139.162.240.151', user: 'admin', roles: %w{app web db} 

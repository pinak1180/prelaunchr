set :application, 'prelaunch_dentector'
set :repo_url,  'git@github.com:pinak1180/prelaunchr.git'
set :deploy_to, '/var/www/applications/prelaunch_dentector'

set :rvm_ruby_version, '2.3.0'
set :rvm_roles, [:app, :web]


# Capistrano seems to assume shared dir under
# /var/www/ems - overiding default_shared path
set :shared_path, File.join(deploy_to, 'shared')

set :scm, :git
set :ssh_options, forward_agent: true
set :log_level, :debug

SSHKit.config.command_map[:rake]  = 'bundle exec rake'
SSHKit.config.command_map[:rails] = 'bundle exec rails'
set :linked_files, %w(config/database.yml config/secrets.yml)
set :linked_dirs, %w(
  log
  public/system
  tmp/cache
  tmp/pids
  tmp/sockets
  vendor/bundle
)

# set :default_env, { path: "/opt/ruby/bin:$PATH" }
# set :keep_releases, 5
set :keep_snapshots, 10


namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end


  after 'deploy:publishing', 'deploy:restart'
  after 'finishing',         'deploy:cleanup'
end

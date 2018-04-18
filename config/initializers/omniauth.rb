Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, ENV['Client_ID'], ENV['Client_Secret']
end

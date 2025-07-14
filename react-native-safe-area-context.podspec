require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-safe-area-context"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.ios.deployment_target = "12.4"
  s.osx.deployment_target = "10.15"
  s.tvos.deployment_target = "12.4"
  s.visionos.deployment_target = "1.0"

  s.source       = { :git => "https://github.com/th3rdwave/react-native-safe-area-context.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m,mm}"
  s.exclude_files = "ios/Fabric"

  s.dependency "React-Core"
end

#/bin/sh

rm -Rf platforms/ios/build/* #deletes previous ipa
cd platforms/ios/
xcodebuild -scheme GigsterGo clean archive -archivePath build/GigsterGo
xcodebuild -exportArchive -exportFormat ipa -archivePath "build/GigsterGo.xcarchive" -exportPath "build/GigsterGo.ipa" -exportProvisioningProfile "pushnotification"

#/bin/sh

rm -Rf "build/gigstergo*" #deletes previous ipa
xcodebuild -scheme gigstergo clean archive -archivePath build/gigstergo
xcodebuild -exportArchive -exportFormat ipa -archivePath "build/gigstergo.xcarchive" -exportPath "build/gigstergo.ipa" -exportProvisioningProfile "gigstergo"

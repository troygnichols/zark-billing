#!/bin/bash

# Make Preview accept AppleScript commands
# sudo defaults write /Applications/Preview.app/Contents/Info NSAppleScriptEnabled -bool true
# sudo chmod 644 /Applications/Preview.app/Contents/Info.plist
# sudo codesign -f -s - /Applications/Preview.app

osascript << EOF
tell application "Preview"
  close (every window whose name is "out.pdf (1 page)")
end tell
EOF

if [ -f out.pdf ]; then
  rm out.pdf
fi

node pdf-ex.js

open out.pdf

osascript << EOF
tell application "System Events" to tell application process "Preview"
  tell (every window whose name is "out.pdf (1 page)")
    set position to {0, 0}
  end tell
end tell
EOF

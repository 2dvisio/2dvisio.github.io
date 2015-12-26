#!/usr/bin/env python
# This command runs the Android `adb dumpsys activity` command
# on the given `package_name` and provides a nicer output
# This script is completely _NOT_ optimized

import os
import sys
import time
import re
from sets import Set
import hashlib

        
def checkAndAssign(command, line, a):
    if ( re.findall(command, line) ) :
        realVar = ( re.findall(command + "=(true|false|[0-9])" , line))[0]
        return realVar
    else :
        return a
        
        
def max(a,b):
    if  a < b :
        return b
    else :
        return a



def showActivities(name_of_package, oldDigest):
    """
    This is the function that run the command and create the 
    output
    """
    prev_status = 0
    status = 0
    name_activity = []
    mResumed = []
    mStopped = []
    mFinished = []
    mCurState = []
    mStateSaved = []
    mDestroyed = []
    first_time = 1

    current = -1
    longestName = 0

    
    p = os.popen('adb shell dumpsys activity ' + name_of_package )

    for line in p:

        if ( re.findall('ACTIVITY', line) ) :
            status = 1
            
            current = current + 1

            mResumed.append("")
            mStopped.append("")
            mFinished.append("")
            mCurState.append("")
            mStateSaved.append("")
            mDestroyed.append("")
            name_activity.append("")
            
            name_activity[current] = (re.findall('\.[_A-Za-z]* ', line))[0]
            longestName = max(longestName, len(name_activity[current]))
            
        else :
            if(status == 1):
                mResumed[current] = checkAndAssign('mResumed', line, mResumed[current])
                mStopped[current] = checkAndAssign('mStopped', line, mStopped[current])
                mFinished[current] = checkAndAssign('mFinished', line, mFinished[current])
                mCurState[current] = checkAndAssign('mCurState', line, mCurState[current])
                mStateSaved[current] = checkAndAssign('mStateSaved', line, mStateSaved[current])
                mDestroyed[current] = checkAndAssign('mDestroyed', line, mDestroyed[current])
                
        
    m = hashlib.md5()
    
    
    
    i=0
    while i < len(name_activity) :
        m.update(name_activity[i])
        m.update(mResumed[i])
        m.update(mStopped[i])
        m.update(mFinished[i])
        m.update(mCurState[i])
        m.update(mStateSaved[i])
        m.update(mDestroyed[i])

        i = i+1

    currentDigest = m.hexdigest()



    if (currentDigest != oldDigest ) :
        print chr(27) + "[2J"

        i=0
        while i < len(name_activity) :
   
            line = "("
            if ( mResumed[i] == "true") :
                line += " Resumed "
            if ( mStopped[i] == "true") :
                line += " Stopped "
            if ( mFinished[i] == "true") :
                line += " Finished "
            if ( mCurState[i] == "true") :
                line += " CurState "
            if ( mStateSaved[i] == "true") :
                line += " StateSaved "
            if ( mDestroyed[i] == "true") :
                line += " Destroyed "
            line += ")"
            print name_activity[i] + ( ' ' * (2 + longestName - len(name_activity[i])) ) + line
            
            
            i = i+1


    return currentDigest
        


def main(args):

    oldDigest = ""
    currentDigest = ""

    if len(args) != 2:
        print "Error: you must have 1 input!"
        return 1
    
    while 1:
    
        oldDigest = currentDigest
        currentDigest = showActivities(args[1], oldDigest)


        time.sleep(0.5)


if __name__ == '__main__':
    sys.exit(main(sys.argv))

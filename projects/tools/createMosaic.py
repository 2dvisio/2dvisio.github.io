#!/usr/bin/python
#
#
#    Program to create a mosaic of videos from all videos in a folder
#    (highly non-optimized)
#
#    Author: Carmelo Velardo
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.


import cv 
import glob
import os
import math
    
    
cv.NamedWindow('a_window', cv.CV_WINDOW_AUTOSIZE)


os.chdir("" + os.getcwd())

cap = []
i = 0
for files in glob.glob("*.m4v"):
   print files
   cap.append(cv.CaptureFromFile(files))
   i+=1
    
 
num_small_squares =  math.ceil(math.sqrt(len(cap)))

print num_small_squares

HEIGHT = 600
WIDTH = 800

height = int(HEIGHT / num_small_squares)
width = int(WIDTH / num_small_squares)


mosaic_image = cv.CreateImage((WIDTH, HEIGHT), cv.IPL_DEPTH_8U, 3)


fourcc = cv.CV_FOURCC('M','J','P','G')
writer = cv.CreateVideoWriter('out.avi', fourcc, 20, (WIDTH, HEIGHT), 1)



running = 1
i=0

flag = 1

while running == 1:
   small_square = cv.CreateImage((width,height), cv.IPL_DEPTH_8U, 3) 
   if (cv.GrabFrame(cap[i]) != 1) :
      break
      

   if flag == 1:
      flag = 0
      iimage = cv.RetrieveFrame(cap[i])
      cv.Resize(iimage, small_square)
      roww = int(i / num_small_squares)
      coll = int(i % num_small_squares)
      cv.SetImageROI(mosaic_image, (coll * width, roww * height, width, height))
      
      print cap[i]
      
      cv.Copy(small_square, mosaic_image)

      cv.ResetImageROI(mosaic_image)
   else :
      flag = 1      

           
   i = (i+1) % len(cap)
   if i == 0:
      cv.WriteFrame(writer, mosaic_image)

print "fin.\n\n"


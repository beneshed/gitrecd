#!/bin/bash 
for i in `seq -w 01 03`;
  do
      for j in `seq -w 01 31`;
        do
          for k in `seq -w 0 23`;
            do  
              wget http://data.githubarchive.org/2014-$i-$j-$k.json.gz
            done
         done
  done

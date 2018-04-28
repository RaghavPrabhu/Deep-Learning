#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 27 07:35:55 2018

@author: raghav prabhu

Sample Run:
----------
python data_processing.py /Users/raghav/Desktop/dogs_breed/ 

"""

import os
import sys
import pandas as pd

""" 
Iterate train dataset folder to create dataset folders by dog breed names. 
Each 32 bit UUID file name have a equivalent reference name (dog breed) name in labels.csv file.

Example:
000bec180eb18c7604dcecc8fe0dba07,boston_bull

"""
def organise_dataset(root_path,):
    dataset_path = root_path+'/dataset'
    train_data = root_path+'/train/'
    os.makedirs(root_path, exist_ok=True)
    df = pd.read_csv(root_path+'/labels.csv')
    files = os.listdir(train_data)
    print("Organising dataset by creating folders by dogs breeds using names in labels")
    for file in files:
        
    	   # Define folder name reference in labels csv by 32 UUID file name
        folder_name = df.loc[df['id'] == file.split('.')[0],'breed'].values[0]
        
        os.makedirs(dataset_path+'/'+folder_name, exist_ok=True)
        source = train_data+file
        destination = dataset_path+'/'+folder_name+'/'+file
        # Moving files from source (train folder) to detination folder under each breed
        os.rename(source, destination)
    print("Dataset folders successfully created by breed name and copied all images in corresponding folders")


def main():
    # Take folder path as in command line argument
    organise_dataset(sys.argv[1])

if __name__ == '__main__':
    main()

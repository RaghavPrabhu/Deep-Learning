# Image Classification Tutorial - TensorFlow!
This tutorial uses Kaggle's [dog breed identification](https://www.kaggle.com/c/dog-breed-identification) competition dataset. The data will be pre-processed, train images and predict dog types with score! 

![Dog Breed Dataset](https://github.com/RaghavPrabhu/Deep-Learning/blob/master/dogs_breed_classification/img/dogs_type_small.png)

The dataset contains train and test dog images along with various type of dog breeds listed in labels.csv. Data set can be downloaded into Kaggle site by using the above mentioned link. The dataset looks like in below. 

**Download Files**
 - train.zip
 - test.zip
 - labels.csv.zip
 
 ![Kaggle Site](https://github.com/RaghavPrabhu/Deep-Learning/blob/master/dogs_breed_classification/img/kaggle_site.png)
 
 ## Setup and Install
 - Python 3.5 & above required!
 - clone the project 
   > git clone git@github.com:RaghavPrabhu/Deep-Learning.git 
    
 - cd Deep-Learning/dogs_breed_classification/
 
 - Create virtual environment, if you want using virtualenv command
 - Install dependent libararies
   > pip install -r requirements.txt
 - Unzip all folders which we downloaded from Kaggle's site
   - unzip train.zip
   - unzip test.zip
   - unzip labels.csv.zip
    
 ## Organise the train folder
 - Run data processing python code to re-arrange folders by dogs breed name
 
   > python data_processing.py /Users/raghav/Desktop/dogs_breed_classification/ 
 
 ## Train your model using our processed dataset
 - Run the below command to train your model using CNN architectures. By default, below script will download 'Google's inception architecture - 'inception-2015-12-05.tgz'.
 
   > python retrain.py --image_dir=dataset/ --bottleneck_dir=bottleneck/ --how_many_training_steps=500 --output_graph=trained_model/retrained_graph.pb --output_labels=trained_model/retrained_labels.txt --summaries_dir=summaries
   
         
           Downloading inception-2015-12-05.tgz ...
           INFO:tensorflow:Looking for images in 'collie'
           INFO:tensorflow:Looking for images in 'scotch_terrier'
           INFO:tensorflow:Looking for images in 'brittany_spaniel'
           INFO:tensorflow:Looking for images in 'labrador_retriever'
           INFO:tensorflow:Looking for images in 'cairn'
           INFO:tensorflow:Looking for images in 'norwich_terrier'
           INFO:tensorflow:Looking for images in 'miniature_poodle'
           INFO:tensorflow:Looking for images in 'komondor'
           INFO:tensorflow:Looking for images in 'rhodesian_ridgeback'
           INFO:tensorflow:Looking for images in 'saint_bernard'
           INFO:tensorflow:Looking for images in 'pekinese'
           INFO:tensorflow:Looking for images in 'cardigan'
           INFO:tensorflow:Looking for images in 'dandie_dinmont'
           INFO:tensorflow:Looking for images in 'keeshond'
           INFO:tensorflow:Looking for images in 'bloodhound'
           INFO:tensorflow:Looking for images in 'norfolk_terrier'
           INFO:tensorflow:Looking for images in 'silky_terrier'
           INFO:tensorflow:Looking for images in 'boston_bull' 
           .... 
  
  
  ## Test your model
  - Run the below python script to classify your test images based on our pre-trained model.
    > python classify.py
  
          japanese_spaniel (score = 0.10750)
          pekinese (score = 0.05065)
          blenheim_spaniel (score = 0.03431)
          papillon (score = 0.02191)
          shih-tzu (score = 0.02064)
          pomeranian (score = 0.01520)
          lhasa (score = 0.01302)
          brabancon_griffon (score = 0.01080)
          maltese_dog (score = 0.01051)
          chihuahua (score = 0.01032)
          clumber (score = 0.01020)
          pug (score = 0.01009)
          sussex_spaniel (score = 0.00966)
          shetland_sheepdog (score = 0.00965)
          boston_bull (score = 0.00955)
          keeshond (score = 0.00934)
          affenpinscher (score = 0.00919)
          bernese_mountain_dog (score = 0.00896)
          saluki (score = 0.00841)
          cocker_spaniel (score = 0.00826)
          samoyed (score = 0.00804)
          ...
          
          
 ## Done.
  
  
 

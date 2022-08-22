<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://user-images.githubusercontent.com/60137426/185881654-727bbbe2-639b-4f78-bdc6-54fefbf6ac5c.png" alt="Project logo"></a>
</p>


<h3 align="center">FULL STACK ML</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/amit9021/Cat_VS_Dog_ML_Predition_Fullstack.svg)](https://github.com/amit9021/Cat_VS_Dog_ML_Predition_Fullstack/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/amit9021/Cat_VS_Dog_ML_Predition_Fullstack.svg)](https://github.com/amit9021/Cat_VS_Dog_ML_Predition_Fullstack/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This web app allows the user to upload a photo of a dog or a cat and get the prediction as to whether there is a dog or a cat in the photo
    <br> 
</p>

## 📝 Table of Contents

[About](#about) |
[The Dataset](#dataset) |
[Building a CNN model with TensorFlow](#cnn) |
[Front end](#front) |
[Back end](#back) |
[Web app url and usage](#url) |
[Authors](#authors) |
[conclusions](#conclusions)

##  About <a name = "about"></a>

The purpose of this personal project is first and foremost to strengthen the knowledge in machine learning and NN in particular.
This machine knows how to take a picture from a user and make a prediction as to whether the picture is of a dog or a cat.

This project implements several technologies:
I build the model with TensorFlow using CNN

On the client side I used HTML JS and TENSORFLOW JS.

On the server side I used NODEJS and IBM WATSON MACHIN LEARNING to host the model.

### Below is the project architecture:
<p align="center">
<img width=700px height=400px align="center" src="https://user-images.githubusercontent.com/60137426/185793061-64b6f2ec-b6b4-4a05-8246-984b878d6a14.jpg" alt="project architecture">
  </p>

##  The Dataset <a name = "dataset"></a>

The data set I used is from KAGGLE and you can check it  <a href="https://www.kaggle.com/datasets/shaunthesheep/microsoft-catsvsdogs-dataset" >here</a>

The data set contains 25K images of dogs and cats that are divided into two classes (dog / cat), the images come in different sizes and therefore it is important to perform pre-processing and correct the size to match the model's requirements, each image consists of 3 layers of RGB color.
  
### Some Random images of the Dataset
<p align="center">
<img width=250 height=250   src="https://user-images.githubusercontent.com/60137426/185878182-d9c6af1c-6139-45af-bfb4-aac7c1f59dcb.jpg">

<img width=250 height=250 src="https://user-images.githubusercontent.com/60137426/185878225-82eee6be-2aa8-4daa-9a0b-0e62c4a88c23.jpg">
</p>

<p align="center">
<img width=250 height=250 src="https://user-images.githubusercontent.com/60137426/185878276-57b3ab99-0c8c-436c-aedc-5efdfd671650.jpg">

<img width=250 height=250 src="https://user-images.githubusercontent.com/60137426/185878304-f5bbafb1-7815-4650-a4a7-e4248666b182.jpg">

</p>

## Building a CNN model with TensorFlow <a name = "cnn"></a>
The model was built in Python in the Jupiter notebook environment

Our dependence:
```
Numpy
Tensorflow
```
1. Preprocessing:
first step, a preliminary inspection of the images in order to find corrupted images and delete them or convert them to an image that can work with TF.

2. Upload the images:
 i used ```tf.keras.utils.image_dataset_from_directory``` Generates a ```tf.data.Dataset``` from image files in a directory.

3. Spliting into Train Validation and Test Datasets and check the class balance in each datasets

4. Build the model- a CNN model
```
model = tf.keras.Sequential([
    tf.keras.layers.Rescaling(scale=1./255, input_shape=(128,128,3)),
    
     
    tf.keras.layers.Conv2D(32, (3,3), activation='relu'),
    tf.keras.layers.MaxPooling2D(),
     tf.keras.layers.Dropout(0.25),
    
    tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
    tf.keras.layers.MaxPooling2D(),
     tf.keras.layers.Dropout(0.25),
    
    tf.keras.layers.Conv2D(128, (3,3), activation='relu'),
    tf.keras.layers.MaxPooling2D(),
     tf.keras.layers.Dropout(0.25),
    
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(512, activation='relu'),
     tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(2, activation='softmax' )
])

```
with ```Adam``` optimizer and loss function ```SparseCategoricalCrossentropy```

5. Fiting the model with 20 epoches and evaluat the model.
* the evaluaton gave me 83 percent accuracy, not perfect, but at this point it satisfies me.

6. deploy the model using IBM watson machine learning - 

I used <a href="https://dataplatform.cloud.ibm.com/exchange/public/entry/view/1eddc77b3a4340d68f762625d40b64f9" >ibm doc for uploading a scikit model </a> and I made an adjustment to my needs

##  Front end <a name = "front"></a>
* <b>USER:</b> The user have the options of uploading a photo from local device or copy dog or cat photo URL link  ==>

* <b>In the browser:</b> After the user uploaded an image, I used TensorFlow js to pre-process the image in order to match the model inputs, the steps was: 
    1. resizing
    2. converting the image to an array. 

==> In the next step, the array is sent to the server

##  Back end <a name = "back"></a>

* <b>Using Node Js and express js -</b>
I built a server, the server performs two functions:
1. Creating an end point for the site itself.
2. Building an API that receives the information from the client and sends it to the IBM Watson API

* in the next stage:
The data goes to the model we built via IBM Watson, then we get a prediction response of whether the image is a dog or a cat, and from the server the data returns back to the client.

##  WebApp URL <a name="url"></a>
As of now, the site is live and a prediction can be made
<a href="https://protected-oasis-78167.herokuapp.com">Check it</a>

* Since the goal of the project is to create an end-to-end application, the level of importance of the UI is a low priority and therefore the design is a simple BOOTSTRAP design, not too flashy but meets the needs of the project


## ⛏️ Built Using <a name = "built_using"></a>

- [TensorFlow](https://www.Tensorflow.com/) - ML Framework for python
- [Ibm watson macine learning](https://cloud.ibm.com/catalog/services/machine-learning/) - ML model hosting
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@amit9021](https://github.com/amit9021) - Idea & Initial work


## Conclusions <a name = "conclusions"></a>

* My main goal in this project was to specialize as much as possible in the capabilities of Tensorflow, in addition it was important to me to allow an end user to make predictions on his own without the need for coding knowledge, also, during the project I often encountered security problems and intensive utilization of the user's resources, so I decided to create the possibility to perform the prediction On the server side and not on the client side.

* The project is not perfect, and those who try to upload another image that is not a dog or a cat will probably be disappointed to see that the model will still return a prediction, due to lack of time I leave this glitch (very simple to fix) for fun and invite you to predict whether a person is a dog or a cat


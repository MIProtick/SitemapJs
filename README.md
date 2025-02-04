# SitemapJs

## Table of Contents
- [SitemapJs](#sitemapjs)
  - [Table of Contents](#table-of-contents)
  - [Descriptions](#descriptions)
  - [Scrapy Steps](#scrapy-steps)
  - [References](#references)

&nbsp;
## Descriptions 

A scrapper to make a site map of urls for any website using Nodejs and Puppeteer.

&nbsp;
## Scrapy Steps 

* **Step1:** *Clone Project*
  ```shell
  git clone https://github.com/MIProtick/SitemapJs.git
  cd SitemapJs
  ``` 
* **Step2:** *Install dependencies*
  ```shell
  npm install
  ```
* **Step3:** *Edit configuration*
  ```javascript
  const base -> Object
  const haspreloader -> Boolean
  const preloader_handle -> String
  const depth -> Number
  ```
* **Step4:** *Start scrapping*
  * _Entire_
    ```shell
    npm run scraper -- entire
    ```
  * _Simplified_
    ```bat
    npm run scraper -- simplified
    ```
* **Step5:** *Open results in [`sitemap_tree`](./sitemap_tree/)*

&nbsp;
## References 
In this project I have made a sitemap for *[Evaly](https://evaly.com.bd/)*, one of the most popular online marketplace in Bangladesh.

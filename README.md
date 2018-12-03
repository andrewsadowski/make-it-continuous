<br />
<div align="center"> 
<img width="auto" height="auto" src="https://s3-us-west-2.amazonaws.com/andrew-sadowski-images/Make_It_Continuous.png">
</div>
<br />
<p align="center">
  <a href="https://github.com/andrewsadowski/make-it-continuous/releases/download/v1.0/make-it-continuous-1.0.0.dmg">
  <img src="https://img.shields.io/badge/MacOS-v.1.0-brightgreen.svg?style=flat-square" alt="MacOS dmg file" />
  </a>
  <a href="https://github.com/andrewsadowski/make-it-continuous/releases/download/v1.0/make-it-continuous-1.0.0.exe">
  <img src="https://img.shields.io/badge/Windows-v.1.0-brightgreen.svg?style=flat-square" alt="MacOS dmg file" />
  </a> 
  <br />
</p>

# Overview

This Electron app takes an srt file, parses all of the timestamps fixing both out of sequence time-values, and also making all back-to-back timestamps under 2 seconds continuous. Simply drag an srt into the app, click the execute button, and an updated version of the provided subtitle will be created with '\_msUpdated' appended to the fileName, at the location of the original subtitle.

## Prerequisites

- Download the release for your platform
  - Click the above badges or check out the releases page [here](https://github.com/andrewsadowski/make-it-continuous/releases)

## Running Application

Open the application, locate the srt you want processed and drag it into the window. If all went well, the 'Execute' button will flash, and you can click it to check and create a new subtitle with all timestamps under 2 seconds made continuous.

### Forthcoming Additions

- Support for directories/multiple srt files

# ESP Installer

ESP Installer is an effort to gather all the knowledge about various platforms that can be used to develop applications for Espressif chips in one place.

![feature X](/images/installer-list.png)

Below is availability matrix:

|Platform|Windows|Linux|MacOS|
|--------|-------|-----|-----|
|ESP IDF|+|+||
|Rust   |+|+||
|Zephyr |+|+||
|Arduino||||
|NuttX||||
|Micropython||||
|TinyGo|+|+||
|Embedded Swift||||
|DeviceScript||||
|.NET NanoFramework||||


The installer was built with following principles in mind:

## Simplicity

ESP Installer extension uses very clean web view with installation process divided into atomic steps, with very clean status of installation. Every step can be repeated, reverted or even edited if anything needs fixing.

## Transparency

All the executed scripts and output are visible in the terminal:

![feature X](/images/installing.png)

As shown in the screen above, every step is clearly separated, all the used scripts and the variables are used in the header.

After that script is sent to the terminal, and finally step execution ends with clear display of the operation result.

![feature X](/images/result-success.png)


## Easy to contribute

Underlying scripts for every step of installation can be viewed and modified, as in the screenshot below.

It makes it easy to test any fixes or changes and then contribute them back to the official extension.

![feature X](/images/modifying-scripts.png)


Thanks to this approach user can review entire process and repeat and fix any commands directly in the terminal.
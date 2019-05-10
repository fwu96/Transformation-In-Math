# README file for Workbook (Assignment) 4

It is the student's responsibility to fill this in.
See <https://graphics.cs.wisc.edu/WP/cs559-sp2019/workbooks/#README_files>

## please answer these first three required questions "inline" (as in the instructions)

Name: Feifan Wu

WiscID: fwu62

GitHub Login: fwu96

## please answer these next (optional) questions on a line following the questions

Attributions:

Parts of the Assignment you did (or did not) do: 
- All the required and some bonus

Did you do any bonus parts? 
- The objects bounce off each other
- Make obstracles

Notes to the Grader:
Finsihed all the required part of this assignment; Will try to do the bonus part through the weekend

***Updates:***
***
- Flock:
    - Implementing that when two circle "hit", they will move towards the opposite direction of which they originally towards
    - And similarly with when they "hit" the edge, their color would be changed after hitting each other, and turning back to the original color after a few seconds

***More Updates:***
- Flock:
    - Add three buttom with more features
        - `Place Circle Obstracles` button will randomly place a circle-shaped obstracle on the screen; ecah time click on this button, the previous obstracle (if there is any) will be cleared and place a new one
        - `Place Rect Obstracles` does the similar word as `Place Circle Obstracles` does, but place a rectangle-shaped obstracle
        - `Clear Obstracles` will clear any obstracles on the screen
    - Once placing any obstracle on the screen, the moving shapes will do bounce off
        - When shapes hit obstracles, their color will be changed for a few seconds and change back to the original color; they will also change their direction to the opposite one aftr htting

Ember Coalmine Canary
=====================

Let the canaries in before the poison gas kills you. 

This repo is a series of very minimalist ember projects used to isolate issues with ember beta and canary, or specific addons

The goal is to create examples that pass in one version of Ember but fail when upgrading or chainging an addon.

The sub projects here are very minimimalist that show the specific issue in context.

I use this project to try out ideas and test the waters before upgrading ember in my regular projects.

## List of projects

#### inventory

Very minimal example to test ember and ember data 10 update

#### liquid-fire-modal-example

Minimal example to test liquid fire modal behavior

#### stressful

A dummy example to stress test ember cli and try to reproduce `FSEventStreamStart` errors in Node and Ember CLI
Note that there is not much going on this app other than a lot of resources.

#### view-select-error

If an Ember select "view" is not properly declared it raises an error.
`Assertion Failed: Unable to find view at path 'select'`


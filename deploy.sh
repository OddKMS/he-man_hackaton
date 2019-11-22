#!/bin/bash
aws s3 sync dist s3://he-man-hackaton2019 --profile oksvart
aws s3 sync markers s3://he-man-hackaton2019/markers --profile oksvart

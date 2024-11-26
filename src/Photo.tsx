import React, { FC } from 'react';
import { Image, ImageProps } from 'react-native';

type PosterProps = {
  image: string;
};

const Photo: FC<Omit<ImageProps, 'source'> & PosterProps> = ({
  image,
  ...props
}) => (
  <Image
    {...props}
    source={{
      uri: image,
    }}
  />
);

export default Photo;

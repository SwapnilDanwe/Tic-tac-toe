import React from "react";

import Icon from "react-native-vector-icons/EvilIcons";

const Icons = ({name}) => {
    switch (name) {

        case 'heart':
            return <Icon name="heart" size={65} color='#AE1438'/>
        case 'like':
            return <Icon name="like" size={65} color='#AE1438' />
        default:
            return <Icon name="pencil" size={65} color='#FFF' />
    }
}

export default Icons;

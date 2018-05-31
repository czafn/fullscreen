exports.default = {
    tree: {
        base: {
            listStyle: 'none',
            color: '#FFF',
            margin: 0,
            padding: "20px",
            backgroundColor: 'rgb(19, 63, 88)',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '16px',
            height:'100%'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: '#EEE',
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '30px',
                    width: '30px',
                    zIndex : 3,
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-10px 0 0 -5px',
                    height: '10px'
                },
                height: 10,
                width: 10,
                arrow: {
                    fill: '#fff',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#fff'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '30px',
                    verticalAlign: 'middle',
                    zIndex: 2,
                    position: "relative"
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};
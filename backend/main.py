import json
import logging
import argparse

from handlers import create_handler


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format='{asctime}.{msecs:0<3.0f} - {threadName}:{filename}:{lineno}  [{levelname}]:-  {message}',
                        datefmt="%H:%M:%S", style='{')

    cparser = argparse.ArgumentParser()
    cparser.add_argument("-c", "--config")

    args = cparser.parse_args()
    config = json.load(open(args.config, 'r'))

    handler_name = config['handler']
    handler_config = config['handler_config']

    create_handler(handler_name, handler_config)


    from app import app
    app.run(host='0.0.0.0', port=5000)
 
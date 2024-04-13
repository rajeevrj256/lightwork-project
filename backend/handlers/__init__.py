
__all__ = ["handler", "create_handler"]


handlers = {}
def register_handler(name, handler):
    global handlers
    assert name not in handlers, f"Duplicate handler found: {name}"
    handlers[name] = handler


handler = None
def create_handler(name, config):
    global handler
    global handlers
    assert name in handlers, f"Failed to find handler: {name}"
    handler = handlers[name]()
    handler.init(config)

    return handler




from handlers.example.handler import ExampleHandler
register_handler("Example", ExampleHandler)
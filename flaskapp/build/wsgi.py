from app import my_app, db
from flask.cli import FlaskGroup
from model import Base, engine
from model.blog import BlogPost, Tag

cli = FlaskGroup(my_app)

@cli.command("create_db")
def create_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    cli()
from app import my_app, db
from flask.cli import FlaskGroup
from model.blog import BlogPost

cli = FlaskGroup(my_app)

@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


if __name__ == "__main__":
    cli()
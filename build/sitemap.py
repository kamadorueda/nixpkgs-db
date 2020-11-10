# Standard library
import json
import glob
import urllib.parse
from more_itertools import (
    chunked,
)

BASE = 'https://kamadorueda.github.io/nixpkgs-db'


def abspath(path):
    return f'{BASE}{path}'


def write(handle, content):
    handle.write(f'{content}\n')


def encode(content):
    return urllib.parse.quote_plus(content)


def main():
    urls = []
    urls.append(abspath('/#/about'))
    urls.append(abspath('/#/contributing'))
    urls.append(abspath('/#/search'))
    urls.append(abspath('/#/source'))
    urls.append(abspath('/#/sponsor'))

    for pkg_path in glob.iglob('data/pkgs/*.json'):
        pkg = pkg_path[10:-5]

        urls.append(abspath(f'/#/pkg/{encode(pkg)}'))
        with open(f'data/pkgs/{pkg}.json') as pkgs:
            for version in json.load(pkgs):
                if version:
                    urls.append(abspath(f'/#/pkg/{encode(pkg)}/{encode(version)}'))

    urls.sort()

    for urls_chunk_index, urls_chunk in enumerate(chunked(urls, 1000)):
        sitemap_path = f'service/public/sitemap.{urls_chunk_index}.xml'
        print(sitemap_path)
        with open(sitemap_path, 'w') as sitemap:
            write(sitemap, '<?xml version="1.0" encoding="UTF-8" ?>')
            write(sitemap, '<urlset xmlns="http://www.google.com/schemas/sitemap/0.84" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84 http://www.google.com/schemas/sitemap/0.84/sitemap.xsd">')
            for url in urls_chunk:
                write(sitemap, f'<url><loc>{url}</loc></url>')
            write(sitemap, '</urlset>')

    for sitemaps_chunk_index, sitemaps_chunk in enumerate(chunked(range(urls_chunk_index + 1), 50)):
        sitemap_index_path = f'service/public/sitemapindex.{sitemaps_chunk_index}.xml'
        print(sitemap_index_path)
        with open(sitemap_index_path, 'w') as sitemap_index:
            write(sitemap_index, '<?xml version="1.0" encoding="UTF-8"?>')
            write(sitemap_index, '<sitemapindex xmlns="http://www.google.com/schemas/sitemap/0.84" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84 http://www.google.com/schemas/sitemap/0.84/siteindex.xsd">')
            for urls_chunk_index in sitemaps_chunk:
                sitemap_path = abspath(f'/sitemap.{urls_chunk_index}.xml')
                write(sitemap_index, f"<sitemap><loc>{sitemap_path}</loc></sitemap>")
            write(sitemap_index, '</sitemapindex>')


if __name__ == '__main__':
    main()

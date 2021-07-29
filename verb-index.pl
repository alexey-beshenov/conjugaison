#!/usr/bin/perl

use warnings;
use strict;

sub normalize {
    $_ = $_[0];

    s/á|à|â|ä/a/g;
    s/é|è|ê|ë/e/g;
    s/í|ì|î|ï/i/g;
    s/ó|ò|ô|ö/o/g;
    s/ú|ù|û|ü/u/g;
    s/ç/c/g;
    s/ñ/n/g;
    #.............

    s/^(s'|se )//;

    return $_;
}

sub verb_sort {
    my $anorm = normalize($a);
    my $bnorm = normalize($b);

    if ($anorm lt $bnorm) { return -1; }
    if ($anorm gt $bnorm) { return +1; }

    # So $anorm eq $bnorm!

    if ($a eq $b) {
	return 0;
    }
    else {
	if ($a =~ m/^(s'|se )/) {
	    return +1;
	}
	else {
	    return -1;
	}
    }
}

sub print_group {
    foreach (@_) {
	$_ = "\"$_\"";
    }
    print "  [ ", (join ", ", @_), " ]";
}

my @verbs = `ls -1 json/`;

for (@verbs) { s/\n// }
for (@verbs) { s/\.json$// }

my @group;
my $letter = substr $verbs[0], 0, 1;

my $first_line = 1;

print "[\n";

for my $v (sort verb_sort @verbs) {
    my $norm_first_letter = substr normalize($v), 0, 1;

    if ($norm_first_letter eq $letter) {
	push @group, $v;
    }
    else {
	if (!$first_line) {
	    print ",\n";
	}
	else {
	    $first_line = 0;
	}

	print_group @group;
	@group = ();
	push @group, $v;
	$letter = $norm_first_letter;
    }
}

if (!$first_line) {
    print ",\n";
}
else {
    $first_line = 0;
}

if (@group != 0) {
    print_group @group;
    print "\n";
}

print "]\n";
